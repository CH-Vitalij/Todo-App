export default function TasksFilter({ status, type }) {
  return <button className={status}>{type}</button>;
}
