import '../css/style.css';
import '../css/fontello.css';

const Post = () => {
  return (
    <article
      className="Post" //ref="Post"
    >
      <div className="Post-user">
        <div className="Post-user-profilepicture">
          <img
            src="https://t4.ftcdn.net/jpg/02/19/63/31/360_F_219633151_BW6TD8D1EA9OqZu4JgdmeJGg4JBaiAHj.jpg"
            alt="Post Pic"
          />
        </div>

        <div className="Post-user-nickname">
          <span>Nickname</span>
        </div>
      </div>

      <div className="Post-image">
        <div className="Post-image-bg">
          <img
            alt="Icon"
            src="https://cdn-images-1.medium.com/max/1200/1*dMSWcBZCuzyRDeMr4uE_og.png"
          />
        </div>
      </div>

      <div className="Post-caption">
        <strong>123 123 123 </strong>
      </div>
    </article>
  );
};

export default Post;
