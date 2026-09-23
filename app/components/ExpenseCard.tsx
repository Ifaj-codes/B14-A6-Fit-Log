export default function ExpenseCard({ title, amount }: { title: string, amount: string }) {
    return (
        <div className="bg-gray-800 p-4 rounded-lg mt-4 w-full max-w-md border-l-4 border-green-500  shadow-md">
            <h3 className="text-xl text-white font-bold">{title}</h3>
            <p className="text-green-400 font-semibold">Cosr: {amount} TK</p>
        </div>
    );
}