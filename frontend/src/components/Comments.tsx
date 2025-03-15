import { Review } from "../types/product";
import { useState, useEffect, useContext } from "react";
import bgImage from "../assets/placeholder-img.png";
import AuthContext from "../context/AuthContext";
import apiProducts from "../api/productService/apiProducts";
import { toast } from "react-toastify";
import { Discuss } from "react-loader-spinner";

const Comments = ({
  comments,
  productId,
}: {
  comments: Review[] | undefined;
  productId: number;
}) => {
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [allComments, setAllComments] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (comments) {
      setAllComments(comments);
    }
  }, [comments]);

  const convertBase64ToBlob = (base64: string) => {
    try {
      const byteCharacters = atob(base64);
      const byteNumbers = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const blob = new Blob([byteNumbers], { type: 'image/jpeg' });
      return URL.createObjectURL(blob);
    } catch (error) {
      return bgImage;
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() === "" || newRating === 0) {
      toast.error("Please fill in all fields", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: localStorage.theme === "dark" ? "dark" : "light",
      });
      return;
    }
    if (newComment.trim() && newRating > 0) {
      const newReview: Review = {
        id: Date.now(),
        productId,
        comment: newComment,
        rating: newRating,
        user: user!,
      };
      try {
        setIsLoading(true);
        apiProducts.addReview(newReview)
        .then((res) => setAllComments([...allComments, res]))
        .then(() => {
          toast.success("Comment added successfully", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            theme: localStorage.theme === "dark" ? "dark" : "light",
          })
        });
      } catch (error) {
        toast.error("Failed to add comment", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          theme: localStorage.theme === "dark" ? "dark" : "light",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="h-full overflow-y-auto w-full p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md custom-scrollbar">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Comments
      </h2>
      <div className="space-y-4">
        {allComments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <div className="flex items-center space-x-4">
              <div
                className="w-10 h-10 rounded-full bg-cover bg-center border"
                style={{
                  backgroundImage: `url(${
                    comment.user?.image
                      ? convertBase64ToBlob(comment.user.image)
                      : bgImage
                  })`,
                }}
              ></div>
              <p className="text-gray-900 dark:text-gray-200 font-medium">
                {comment.user?.username || "Anonymous"}
              </p>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              {comment.comment}
            </p>
            <div className="flex mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`p-1 text-lg ${
                    comment.rating >= star
                      ? "text-yellow-500"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <textarea
          className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          value={newComment}
          onChange={(e) => {
            e.preventDefault();
            setNewComment(e.target.value);
          }}
          placeholder="Add a comment"
        />
        <div className="mt-2 flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={`p-1 text-lg ${
                newRating >= star
                  ? "text-yellow-500"
                  : "text-gray-400 dark:text-gray-500"
              }`}
              onClick={() => setNewRating(star)}
            >
              ★
            </button>
          ))}
        </div>
          <button
            className="mt-3 w-48 h-10 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition relative"
            onClick={handleAddComment}
            >
            {isLoading ? (
            <div className="flex items-center space-x-4  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Discuss
                  visible={true}
                  height="40"
                  width="40"
                  ariaLabel="discuss-loading"
                  wrapperStyle={{}}
                  wrapperClass="discuss-wrapper"
                  colors={["#fff", "#fff"]}
                />
          </div>
            ) : (
              <span>

            Add Comment
              </span>
          )}
          </button>
      </div>
    </div>
  );
};

export default Comments;