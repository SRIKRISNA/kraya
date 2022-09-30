import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Myfiles = () => {
    const [posts, setPosts] = useState({ image: "", author: "", location: "", description: "" });
    const [setvalue] = useState("No File Chosen")
    const navigate = useNavigate();

    const handleUpload = () => {
        //console.log(posts);
        axios({
            url: "http://localhost:5000/upload",
            method: "POST",
            headers: {
            },
            // data: posts
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
        navigate("/");
    }

    return (
        <>
            style={{
                padding: "10px 20px",
                background: "red",
                border: "none",
                marginRight: "25px",
                borderRadius: "4px",
                color: "white"
            }};
            <div className="container">
                <h1>hello files</h1>
                <header>
                    {/* <Header /> */}
                </header>
                <div className="formContainer">
                    <div>
                        <input type="file" name="file"  />
                        <div>
                            <button onClick={handleUpload}>Submit</button>
                        </div>
                    </div>
                    <button onClick={(e) => handleUpload(e)} >upload</button>
                    <button style={{ padding: "10px 20px", background: "red", border: "none", marginRight: "25px", borderRadius: "4px", color: "white" }} >Delete</button>
                    <button style={{ padding: "10px 20px", background: "red", border: "none", marginRight: "25px", borderRadius: "4px", color: "white" }} >View Files</button>
                    <button style={{ padding: "10px 20px", background: "red", border: "none", marginRight: "25px", borderRadius: "4px", color: "white" }} >Download Files</button>

                </div>
                {/* <Footer/> */}
            </div>
            <div><p>Helloodkcie</p></div>
        </>
    );
}
export default Myfiles;