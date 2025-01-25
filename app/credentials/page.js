"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function CredentialsPage() {
    const searchParams = useSearchParams(); // Access search parameters
    const passport_id = searchParams.get("passport_id"); // Get the `passport_id` query param
    const router = useRouter(); // Use router for navigation
    const [credentials, setCredentials] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (passport_id) {
            fetch(`https://api.talentprotocol.com/api/v2/passport_credentials?passport_id=${passport_id}`, {
                method: "GET",
                headers: {
                    "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`Error: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => setCredentials(data.passport_credentials))
                .catch((err) => setError(err.message));
        }
    }, [passport_id]);

    if (!passport_id) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{ padding: "20px" }}>
            <button
                onClick={() => router.push("/")} // Navigate to the home page
                style={{
                    backgroundColor: "#0070f3",
                    color: "#fff",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginBottom: "20px",
                }}
            >
                Home
            </button>

            <h1>Credentials for Passport: {passport_id}</h1>

            {credentials && (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "20px",
                        marginTop: "20px",
                    }}
                >
                    {credentials.map((cred) => (
                        <div
                            key={cred.id}
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                padding: "10px",
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                textAlign: "center",
                            }}
                        >
                            <h3>{cred.name}</h3>
                            <p><strong>Category:</strong> {cred.category}</p>
                            <p><strong>Score:</strong> {cred.score}/{cred.max_score}</p>
                            <p><strong>Value:</strong> {cred.value || "N/A"}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
