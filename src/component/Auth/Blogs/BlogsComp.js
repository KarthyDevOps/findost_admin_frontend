import React, { useState, useEffect } from "react";
import { getKnowledge } from "service/Cms";
import { useForm } from "react-hook-form";
import { history } from "helpers";

const BlogsComp = () => {
  const { register, handleSubmit, errors, control, reset, setError } = useForm({
    mode: "onChange",
  });
  const [sample, setSample] = useState("");
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const blogId = urlParams.get("id");

  const getBlogDetails = async () => {
    try {
      const params = {
        id: blogId,
      };
      let response = await getKnowledge(params, token);
      if (response.status === 200) {
        setSample(response?.data.data?.description);
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  useEffect(() => {
    if (token && blogId) {
      getBlogDetails();
    } else {
      history.push("/auth/login");
    }
  }, []);

  const processedHtml = sample.replace(/></g, ">\n<").split("\n");

  return (
    <div className="p-5">
      {processedHtml.map((line, index) => (
        <React.Fragment key={index}>
          {line && (
            <div
              dangerouslySetInnerHTML={{
                __html: line.includes("<img")
                  ? line.replace(
                      "<img",
                      '<img style="width:100px;height:100px;"'
                    )
                  : line,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BlogsComp;
