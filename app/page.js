"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { getLanguagesByLocation, getRolesFromBio } from "./utils/utils"; // Import utility functions

export default function TalentProfileRetrieval() {
    const [walletAddress, setWalletAddress] = useState("");
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter(); // Initialize useRouter for navigation

    const handleInputChange = (event) => {
        setWalletAddress(event.target.value);
    };

    const handleButtonClick = async () => {
        if (!walletAddress) {
            alert("Please enter a wallet address.");
            return;
        }

        try {
            const res = await fetch(`https://api.talentprotocol.com/api/v2/passports/${walletAddress}`, {
                method: "GET",
                headers: {
                    "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
                },
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            const data = await res.json();
            setResponseData(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setResponseData(null);
        }
    };

    const handleClear = () => {
        setWalletAddress("");
        setResponseData(null);
        setError(null);
    };

    const navigateToCredentials = () => {
        if (responseData && responseData.passport && responseData.passport.passport_id) {
            router.push(`/credentials?passport_id=${responseData.passport.passport_id}`);
        } else {
            alert("Passport ID not available.");
        }
    };

    const formatJoinedDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(date);
    };

    const renderBoxes = (items, backgroundColor = "#e0e0e0", textColor = "#000") => {
        return items.map((item, index) => (
            <div
                key={index}
                style={{
                    display: "inline-block",
                    padding: "10px 15px",
                    margin: "5px",
                    borderRadius: "8px",
                    backgroundColor,
                    color: textColor,
                    fontWeight: "bold",
                    border: "1px solid #ccc",
                }}
            >
                {item}
            </div>
        ));
    };

    const renderSocials = (socials) => {
        return socials.map((social, index) => {
            const sourceIcon = `/${social.source.toLowerCase()}.png`;
            return (
                <a
                    key={index}
                    href={social.profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.profile_display_name}
                    style={{ marginRight: "10px" }}
                >
                    <img
                        src={sourceIcon || "/default-social-icon.png"}
                        alt={social.profile_display_name}
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: social.source.toLowerCase() === "twitter" ? "0" : "50%",
                        }}
                    />
                </a>
            );
        });
    };

    return (
        <div style={{ fontFamily: "'Roboto', sans-serif", textAlign: "center", margin: "20px" }}>
            {/* Top Navigation */}
            <nav style={{ marginBottom: "20px" }}>
                {["Home", "Profile", "Discover", "Rewards", "Services", "Credentials"].map((item) => (
                    <span
                        key={item}
                        style={{
                            cursor: item === "Credentials" ? "pointer" : "default",
                            textDecoration: item === "Credentials" ? "underline" : "none",
                            fontWeight: item === "Credentials" ? "bold" : "normal",
                            marginRight: "20px",
                        }}
                        onClick={() => item === "Credentials" && navigateToCredentials()} // Link Credentials to the new page
                    >
                        {item}
                    </span>
                ))}
            </nav>

            {/* Welcome Section */}
            <div>
                <img src="/logo.png" alt="A server surrounded by magic sparkles." style={{ width: "100px" }} />
                <h1 style={{ fontSize: "24px", margin: "10px 0" }}>Welcome to Talent Profile Retrieval</h1>
            </div>

            {/* Input Section */}
            <div style={{ margin: "20px 0" }}>
                <input
                    type="text"
                    placeholder="Enter wallet address"
                    value={walletAddress}
                    onChange={handleInputChange}
                    style={{
                        padding: "10px",
                        width: "300px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        marginRight: "10px",
                    }}
                />
                <button
                    onClick={handleButtonClick}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        marginRight: "10px",
                    }}
                >
                    Submit
                </button>
                <button
                    onClick={handleClear}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#f44336",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                    }}
                >
                    Clear
                </button>
            </div>

            {/* Data Display Section */}
            {responseData && (
                <div style={{ marginTop: "20px", textAlign: "left", display: "inline-block", width: "80%" }}>
                    {/* Profile Information */}
                    <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "20px", borderRadius: "10px" }}>
                        <img
                            src={responseData.passport.user.profile_picture_url}
                            alt="Profile"
                            style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                                marginBottom: "10px",
                            }}
                        />
                        <h2>
                            {responseData.passport.user.name}{" "}
                            {responseData.passport.passport_profile.verified && (
                                <img
                                    src="/tick-mark.png"
                                    alt="Verified"
                                    style={{ width: "16px", height: "16px", marginLeft: "5px" }}
                                />
                            )}
                            {responseData.passport.human_checkmark && (
                                <img
                                    src="/tick-mark.png"
                                    alt="Human Verified"
                                    style={{ width: "16px", height: "16px", marginLeft: "5px" }}
                                />
                            )}
                        </h2>
                        <p>{responseData.passport.passport_profile.bio}</p>
                        <p>
                            <strong>Username:</strong> @{responseData.passport.passport_profile.display_name}
                        </p>
                        <p>
                            <strong>Location:</strong> {responseData.passport.passport_profile.location}
                        </p>
                        <p>
                            <strong>Rank:</strong>
                            <div
                                style={{
                                    display: "inline-block",
                                    width: "80px",
                                    height: "46px",
                                    backgroundColor: "#800080",
                                    position: "relative",
                                    clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                                    textAlign: "center",
                                    lineHeight: "46px",
                                    fontWeight: "bold",
                                    color: "#fff",
                                    marginLeft: "10px",
                                }}
                            >
                                #{responseData.passport.identity_score}
                            </div>
                        </p>
                    </div>

                    {/* Abilities Section */}
                    <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "10px" }}>
                        <h3>Abilities</h3>
                        <div>
                            <h4>Skills:</h4>
                            {renderBoxes(responseData.passport.passport_profile.tags, "#d3f9d8", "#2d7a2c")}
                        </div>
                        <div>
                            <h4>Languages:</h4>
                            {renderBoxes(getLanguagesByLocation(responseData.passport.passport_profile.location), "#d9e8fb", "#214f88")}
                        </div>
                        <div>
                            <h4>Roles:</h4>
                            {renderBoxes(getRolesFromBio(responseData.passport.passport_profile.bio), "#fddede", "#a94442")}
                        </div>
                    </div>

                    {/* Social Links Section */}
                    <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "10px" }}>
                        <h4>Credentials</h4>
                        {renderSocials(responseData.passport.passport_socials)}
                        <button
                            onClick={navigateToCredentials}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#007BFF",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                marginTop: "10px",
                            }}
                        >
                            Go to Credentials Page
                        </button>
                    </div>
                </div>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
