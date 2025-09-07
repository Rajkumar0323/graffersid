export default function RenderStars({ rating }) {
    return Array.from({ length: 5 }, (_, i) => (
        <i
            key={i}
            className={`bi ${i < Math.floor(rating)
                ? "bi-star-fill text-warning"
                : i < rating
                    ? "bi-star-half text-warning"
                    : "bi-star text-secondary"
                }`}
        ></i>
    ));
}
