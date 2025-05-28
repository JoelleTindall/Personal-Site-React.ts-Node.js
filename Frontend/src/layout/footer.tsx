import cat from "../assets/images/bouncecat.gif";

export default function Footer() {
  return (
    <>
      <footer>
        <a
          onClick={() => {
            window.scroll({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <img src={cat}></img>
          <p>Back to top</p>
        </a>
      </footer>
    </>
  );
}
