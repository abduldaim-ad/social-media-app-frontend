import React from "react";

const ImageCreatePost =
    ({
        file,
        setFile,
    }) => {

        const handleSelectFile = (e) => setFile(e.target.files[0]);

        return (
            <>
                <div className="App">
                    <input
                        id="file"
                        type="file"
                        onChange={handleSelectFile}
                        multiple={false}
                    />
                </div>
            </>
        )
    }

export default ImageCreatePost;