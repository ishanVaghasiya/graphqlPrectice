import React, { useState } from "react";
import { WRITE_QUOTES } from "../graphql/mutation";
import { useMutation } from "@apollo/client";
import toast, { Toaster } from 'react-hot-toast';
import { GET_ALL_USERS_QUOTES, GET_MY_PROFILE } from "../graphql/queries";


const CreateQuote = () => {
    const [quote, setQuote] = useState("");
    const [writeQuotes, { loading, error, data }] = useMutation(WRITE_QUOTES, {
        refetchQueries: [
            GET_ALL_USERS_QUOTES, "getQuotes",   // or only "getQuotes"
            GET_MY_PROFILE, "getMyProfile"
        ]
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(quote);
        writeQuotes({
            variables: {
                name: quote
            }
        })
        quote.value = "";
    };
    if (loading) {
        return <h3>Loading....</h3>;
    }
    return (
        <div className="container my-container" style={{ width: "700px" }}>
            {data && <div className="green card-panel">Add quotes</div>}
            {error && <div className="red card-panel">{error.message}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    placeholder="write your quote here"
                />
                <button className="btn green">create</button>
            </form>
        </div>
    );
};

export default CreateQuote;
