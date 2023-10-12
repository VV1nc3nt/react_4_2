import { useState } from "react"
import { nanoid } from "nanoid";

interface Walk {
  id: string;
  date: string;
  distance: number;
}

export default function ProgressTable() {
  const [walks, setWalk] = useState<Walk[]>([]);
  const [walkDate, setWalkDate] = useState('');
  const [walkDistance, setWalkDistance] = useState('');

  const clearForm = () => {
    setWalkDate('');
    setWalkDistance('');
  };

  const pushWalk = (walk: Walk) => {
    setWalk((prevState) => [...prevState, walk]);

    clearForm();
  };

  const updateWalk = (walk: Walk) => {
    walks.filter(element => element.date === walk.date ? element.distance += walk.distance : null);

    setWalk((prevState) => [...prevState]);

    clearForm();
  };

  const createWalk = () => {
    const date = new Date(walkDate).toLocaleDateString('ru-RU');

    const distance = Number(walkDistance);

    const walk = { id: nanoid(), date: date, distance: distance};

    return walk
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const walk = createWalk();

    walks.some(element => element.date === walk.date) ? updateWalk(walk) : pushWalk(walk);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => setWalkDate(event.target.value);

  const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => setWalkDistance(event.target.value);

  const handleRemoveWalk = (id: string) => setWalk((prevState) => prevState.filter((element) => element.id !== id));

  return (
    <>
      <form 
        className="progress-form"
        onSubmit={ handleSubmit }
      >
        <div className="input-wrapper">
          <label htmlFor="date" className="label">Дата</label>
          <input 
            type="date"
            id="date"
            name="date"
            className="input-field"
            required
            value={ walkDate }
            onChange={ handleDateChange }
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="distance" className="label">Пройдено КМ</label>
          <input
            type="text" 
            id="distance"
            name="distance"
            className="input-field"
            required
            value={ walkDistance }
            onChange={ handleDistanceChange }
          />
        </div>
        <button className="progress-btn" type="submit">Ок</button>
      </form>
      <ul className="walk-ul">
        {
          walks
            .sort((firstDate: Walk, secondDate: Walk) => {
              return secondDate.date.split('.').reverse().join().localeCompare(firstDate.date.split('.').reverse().join())
            })
            .map((walk) => {
              return (
                <li className="walk-li" key={ walk.id }>
                  <span>{ walk.date }</span>
                  <span>{ walk.distance + ' км' }</span>
                  <button className="delete-btn" onClick={ () => handleRemoveWalk(walk.id) } >✘</button>
                </li>
              )
            })
        }
      </ul>
    </>
  )
}
