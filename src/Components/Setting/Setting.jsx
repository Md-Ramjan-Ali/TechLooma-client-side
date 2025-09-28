import React, { useState, useEffect } from "react";
import {
  updateProfile,
  updatePassword,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "../../Firebase/firebase.config";
import { toast } from "react-toastify";
import {
  FaUser,
  FaLock,
  FaBell,
  FaPalette,
  FaEye,
  FaEyeSlash,
  FaSave,
  FaEdit,
  FaCamera,
} from "react-icons/fa";

const Settings = () => {
  // User Profile State
  const [profileData, setProfileData] = useState({
    displayName: "",
    email: "",
    photoURL: "",
    phoneNumber: "",
    bio: "",
  });

  // Password Change State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Settings State
  const [settingsData, setSettingsData] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
    theme: "dark",
    language: "en",
    timezone: "UTC",
  });

  // UI State
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Load user data on component mount
  useEffect(() => {
    if (auth.currentUser) {
      setProfileData({
        displayName: auth.currentUser.displayName || "",
        email: auth.currentUser.email || "",
        photoURL: auth.currentUser.photoURL || "",
        phoneNumber: auth.currentUser.phoneNumber || "",
        bio: "", // This would come from your database
      });
    }
  }, []);

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, {
        displayName: profileData.displayName,
        photoURL: profileData.photoURL,
      });

      // Update email if changed
      if (profileData.email !== auth.currentUser.email) {
        await updateEmail(auth.currentUser, profileData.email);
      }

      // Here you would also update additional profile data in your database
      // Example: await updateUserProfile(auth.currentUser.uid, { bio: profileData.bio, phoneNumber: profileData.phoneNumber });

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      // Re-authenticate user before changing password
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        passwordData.currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Update password
      await updatePassword(auth.currentUser, passwordData.newPassword);

      // Clear form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      toast.success("Password updated successfully!");
    } catch (error) {
      console.error("Password update error:", error);
      toast.error(error.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  // Handle settings update
  const handleSettingsUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save settings to your database
      // await updateUserSettings(auth.currentUser.uid, settingsData);

      toast.success("Settings updated successfully!");
    } catch (error) {
      console.error("Settings update error:", error);
      toast.error("Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: FaUser },
    { id: "security", label: "Security", icon: FaUser },
    { id: "notifications", label: "Notifications", icon: FaBell },
    { id: "preferences", label: "Preferences", icon: FaPalette },
  ];

  return (
    <div className="min-h-screen bg-base-content p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-content mb-2">
            Settings
          </h1>
          <p className="text-secondary-content/70">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl p-3">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === tab.id
                        ? "bg-primary text-secondary-content shadow-md"
                        : "hover:bg-primary text-secondary-content"
                    }`}
                  >
                    <tab.icon className="text-lg" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <FaUser className="text-primary" />
                    Profile Information
                  </h2>

                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-base-200 flex items-center justify-center overflow-hidden">
                          {profileData.photoURL ? (
                            <img
                              src={profileData.photoURL}
                              alt="Profile"
                              className="w-full h-full object-center"
                            />
                          ) : (
                            <FaUser className="text-3xl text-secondary-content" />
                          )}
                        </div>
                        <button
                          type="button"
                          className="absolute -bottom-2 -right-2 btn btn-circle btn-sm btn-primary"
                        >
                          <FaCamera className="text-sm" />
                        </button>
                      </div>
                      <div>
                        <h3 className="font-semibold">Profile Picture</h3>
                        <p className="text-sm text-secondary-content/70">
                          Upload a new profile picture
                        </p>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="">
                        <label className="block font-medium mb-2">
                          Display Name<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          // {...register("name", { required: true })}
                          placeholder="Enter Display Name"
                          className="w-full bg-transparent text-secondary-content border-1 border-primary-content rounded-lg  px-4 py-2 focus:outline-none focus:border-primary transition-all duration-200"
                        />
                      </div>

                      <div className="">
                        <label className="block font-medium mb-2">
                          Email<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              email: e.target.value,
                            })
                          }
                          className="w-full bg-transparent text-secondary-content border-1 border-primary-content rounded-lg  px-4 py-2 focus:outline-none focus:border-primary transition-all duration-200"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div className="form-control">
                        <label className="block font-medium mb-2">
                          Phone Number<span className="text-red-500">*</span>
                        </label>

                        <input
                          type="tel"
                          value={profileData.phoneNumber}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              phoneNumber: e.target.value,
                            })
                          }
                          className="w-full bg-transparent text-secondary-content border-1 border-primary-content rounded-lg  px-4 py-2 focus:outline-none focus:border-primary transition-all duration-200"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div className="">
                        <label className="block font-medium mb-2">
                          Photo URL<span className="text-red-500">*</span>
                        </label>

                        <input
                          type="url"
                          value={profileData.photoURL}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              photoURL: e.target.value,
                            })
                          }
                          className="w-full bg-transparent text-secondary-content border-1 border-primary-content rounded-lg  px-4 py-2 focus:outline-none focus:border-primary transition-all duration-200"
                          placeholder="Enter photo URL"
                        />
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="block font-medium mb-2">
                        Bio<span className="text-red-500">*</span>
                      </label>

                      <textarea
                        value={profileData.bio}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            bio: e.target.value,
                          })
                        }
                        className="w-full bg-transparent text-secondary-content border border-primary-content rounded-lg px-4 py-2 focus:outline-none focus:border-primary resize-none"
                        placeholder="Tell us about yourself"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="btn bg-primary text-secondary-content border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-tl-2xl rounded-br-2xl"
                      >
                        {loading ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          <FaSave className="mr-2" />
                        )}
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <FaUser className="text-primary" />
                    Security Settings
                  </h2>

                  <form onSubmit={handlePasswordChange} className="space-y-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          Current Password
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword.current ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              currentPassword: e.target.value,
                            })
                          }
                          className="w-full bg-transparent text-secondary-content border-1 border-primary-content rounded-lg  px-4 py-2 focus:outline-none focus:border-primary transition-all duration-200"
                          placeholder="Enter current password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("current")}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showPassword.current ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          New Password
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword.new ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              newPassword: e.target.value,
                            })
                          }
                          className="w-full bg-transparent text-secondary-content border-1 border-primary-content rounded-lg  px-4 py-2 focus:outline-none focus:border-primary transition-all duration-200"
                          placeholder="Enter new password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("new")}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showPassword.new ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">
                          Confirm New Password
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword.confirm ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="w-full bg-transparent text-secondary-content border-1 border-primary-content rounded-lg  px-4 py-2 focus:outline-none focus:border-primary transition-all duration-200"
                          placeholder="Confirm new password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("confirm")}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn bg-primary text-secondary-content border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-tl-2xl rounded-br-2xl"
                    >
                      {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <FaLock className="mr-2" />
                      )}
                      Update Password
                    </button>
                  </form>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <FaBell className="text-primary" />
                    Notification Preferences
                  </h2>

                  <form onSubmit={handleSettingsUpdate} className="space-y-6">
                    <div className="space-y-4">
                      <div className="form-control">
                        <label className="label cursor-pointer justify-start gap-3">
                          <input
                            type="checkbox"
                            checked={settingsData.emailNotifications}
                            onChange={(e) =>
                              setSettingsData({
                                ...settingsData,
                                emailNotifications: e.target.checked,
                              })
                            }
                            className="toggle toggle-primary"
                          />
                          <div>
                            <span className=" font-medium text-secondary-content">
                              Email Notifications
                            </span>
                            <p className="text-sm text-secondary-content">
                              Receive notifications via email
                            </p>
                          </div>
                        </label>
                      </div>

                      <div className="form-control">
                        <label className="label cursor-pointer justify-start gap-3">
                          <input
                            type="checkbox"
                            checked={settingsData.pushNotifications}
                            onChange={(e) =>
                              setSettingsData({
                                ...settingsData,
                                pushNotifications: e.target.checked,
                              })
                            }
                            className="toggle toggle-primary"
                          />
                          <div>
                            <span className="font-medium text-secondary-content">
                              Push Notifications
                            </span>
                            <p className="text-sm text-secondary-content">
                              Receive push notifications in browser
                            </p>
                          </div>
                        </label>
                      </div>

                      <div className="form-control">
                        <label className="label cursor-pointer justify-start gap-3">
                          <input
                            type="checkbox"
                            checked={settingsData.marketingEmails}
                            onChange={(e) =>
                              setSettingsData({
                                ...settingsData,
                                marketingEmails: e.target.checked,
                              })
                            }
                            className="toggle toggle-primary"
                          />
                          <div>
                            <span className="font-medium text-secondary-content">
                              Marketing Emails
                            </span>
                            <p className="text-sm text-secondary-content">
                              Receive promotional and marketing emails
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn bg-primary text-secondary-content border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-tl-2xl rounded-br-2xl"
                    >
                      {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <FaSave className="mr-2" />
                      )}
                      Save Preferences
                    </button>
                  </form>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === "preferences" && (
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                    <FaPalette className="text-primary" />
                    App Preferences
                  </h2>

                  <form onSubmit={handleSettingsUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="">
                        <label className="block font-medium mb-2">
                          Theme<span className="text-red-500">*</span>
                        </label>

                        <select
                          value={settingsData.theme}
                          onChange={(e) =>
                            setSettingsData({
                              ...settingsData,
                              theme: e.target.value,
                            })
                          }
                          className="select w-full bg-transparent text-secondary-content border-1 border-primary-content rounded-lg  px-4 py-2 focus:outline-none focus:border-primary transition-all duration-200"
                        >
                          <option
                            className="bg-base-content text-secondary-content"
                            value="dark"
                          >
                            Dark
                          </option>
                          <option
                            className="bg-base-content text-secondary-content"
                            value="light"
                          >
                            Light
                          </option>
                          <option
                            className="bg-base-content text-secondary-content"
                            value="auto"
                          >
                            Auto
                          </option>
                        </select>
                      </div>

                      <div className="form-control">
                        <label className="block font-medium mb-2">
                          Language<span className="text-red-500">*</span>
                        </label>

                        <select
                          value={settingsData.language}
                          onChange={(e) =>
                            setSettingsData({
                              ...settingsData,
                              language: e.target.value,
                            })
                          }
                          className="select w-full bg-transparent text-secondary-content border-1 border-primary-content rounded-lg  px-4 py-2 focus:outline-none focus:border-primary transition-all duration-200"
                        >
                          <option
                            className="bg-base-content text-secondary-content"
                            value="en"
                          >
                            English
                          </option>
                          <option
                            className="bg-base-content text-secondary-content"
                            value="bn"
                          >
                            বাংলা
                          </option>
                          <option
                            className="bg-base-content text-secondary-content"
                            value="hi"
                          >
                            Hindi
                          </option>
                        </select>
                      </div>

                      <div className="form-control">
                        <label className="block font-medium mb-2">
                          Timezone<span className="text-red-500">*</span>
                        </label>
                        <select
                          value={settingsData.timezone}
                          onChange={(e) =>
                            setSettingsData({
                              ...settingsData,
                              timezone: e.target.value,
                            })
                          }
                          className="select w-full bg-transparent text-secondary-content border-1 border-primary-content rounded-lg  px-4 py-2 focus:outline-none focus:border-primary transition-all duration-200"
                        >
                          <option
                            className="bg-base-content text-secondary-content"
                            value="UTC"
                          >
                            UTC
                          </option>
                          <option
                            className="bg-base-content text-secondary-content"
                            value="Asia/Dhaka"
                          >
                            Asia/Dhaka
                          </option>
                          <option
                            className="bg-base-content text-secondary-content"
                            value="Asia/Kolkata"
                          >
                            Asia/Kolkata
                          </option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn bg-primary text-secondary-content border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-tl-2xl rounded-br-2xl"
                    >
                      {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <FaSave className="mr-2" />
                      )}
                      Save Preferences
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
