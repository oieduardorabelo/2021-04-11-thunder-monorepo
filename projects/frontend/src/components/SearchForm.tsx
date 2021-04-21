type PropsSearchForm = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  state: {
    gender: string;
    age: string;
    op: string;
  }
}
export function SearchForm(props: PropsSearchForm) {
  return (
    <form onSubmit={props.onSubmit} className="w-full">
      <ul className="grid gap-2 md:grid-cols-2 md:gap-4">
        <li className="flex flex-col">
          <label className="font-semibold text-lg" htmlFor="filter.gender">
            Select gender:
          </label>
          <select
            name="filter.gender"
            id="filter.gender"
            defaultValue={props.state.gender}
            className="w-full"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </li>
        <li className="flex flex-col">
          <label className="font-semibold text-lg" htmlFor="filter.age">
            Type an age:
          </label>
          <input
            type="text"
            name="filter.age"
            id="filter.age"
            defaultValue={props.state.age}
            className="w-full"
          />
        </li>
        <li className="flex flex-col">
          <label className="font-semibold text-lg" htmlFor="filter.op">
            Age match is:
          </label>
          <select
            name="filter.op"
            id="filter.op"
            defaultValue={props.state.op}
            className="w-full"
          >
            <option value="gte">
              Greater than or equal the specified value
            </option>
            <option value="lt">Less than the specified value</option>
          </select>
        </li>
        <li className="flex flex-col justify-end">
          <button
            type="submit"
            className="py-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 w-full"
          >
            Search People
          </button>
        </li>
      </ul>
    </form>
  );
}
