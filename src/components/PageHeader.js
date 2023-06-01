export default function PageHeader({ name }) {
    return <h1
          className="p-2 mx-auto mt-5 mb-4 bg-dark text-info border border-secondary border-opacity-25 border-3 rounded"
          style={{
            boxShadow: "0px 5px 5px 5px rgba(0,0,0,0.2)",
          }}
        >
          <strong>{name}</strong>
        </h1>
}