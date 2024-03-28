import CardRow from "../GenericComponents/CardRow"

function RequestedCard({ item }) {

  return (
    <div className="block w-full p-6 bg-gray-700 border border-gray-200 rounded-lg shadow">
      <h1 className="mb-2 text-md font-bold tracking-tight text-white">
        {item['Full Name']}
      </h1>
      <ul>
        <CardRow
          name={"Email :"}
          value={item.Email}
        />
        <CardRow
          name={"status"}
          value={item[item.Access[0].CorporationId]}
        />
      </ul>
    </div>
  )
}

export default RequestedCard