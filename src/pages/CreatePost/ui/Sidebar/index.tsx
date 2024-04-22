import { Link } from 'react-router-dom'
import s from './Sidebar.module.scss'

function Sidebar() {
  return (
    <aside className={s.sidebar}>
      <div className={s.sidebar__item}>
        <div className={s.sidebar__title}>ХАБР ИЩЕТ АВТОРОВ</div>
        <p className={s.sidebar__text}>
          Мы ищем авторов в контент-студию — помогать компаниям делать крутые статьи для техноблогов и мегапроекты.Хотите писать не только на Хабр, но и для Хабра? Давайте познакомимся!
        </p>
      </div>
      <div className={s.sidebar__item}>
        <div className={s.sidebar__title}>НОВЫЙ РЕДАКТОР</div>
        <p className={s.sidebar__text}>
          Это новый WYSIWYG-редактор, в котором по умолчанию будут создаваться все новые публикации. Подробнее о работе нового редактора можно узнать в этом  
          {
            <Link to={'/help/wysiwyg'}> разделе</Link>
          }. Старый редактор доступен по ссылке, но скоро его поддержка прекратится.
        </p>
      </div>
      <div className={s.sidebar__item}>
        <div className={s.sidebar__title}>ПАМЯТКА АВТОРУ</div>
        <ul className={s.list}>
          <li className={s.list__item}>
            <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.5 8.5L13.1 18l-3.6-3.5L7 17l6.1 6L25 11l-2.5-2.5z" fill="#929CA5"></path><rect x="1" y="1" width="30" height="30" rx="3" stroke="#929CA5" strokeWidth="2"></rect></svg>
            <span>
              Соблюдайте 
              {
                <Link to={'/help/rules'}> правила сайта</Link>
              }
            </span>
          </li>
          <li className={s.list__item}>
            <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="20" height="12" rx="2" fill="#929CA5"></rect><rect x="6" y="24" width="20" height="2" rx="1" fill="#929CA5"></rect><rect x="6" y="20" width="12" height="2" rx="1" fill="#929CA5"></rect><rect x="1" y="1" width="30" height="30" rx="3" stroke="#929CA5" strokeWidth="2"></rect></svg>
            <span>
              Следуйте советам и заботливо оформляйте публикации
            </span>
          </li>
          <li className={s.list__item}>
            <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8 15.3l5.94-3.3L8 8.7v6.6zm2.86.7h10.28L16 13.144 10.86 16zM24 15.3V8.7L18.06 12 24 15.3zM21.14 8H10.86L16 10.856 21.14 8zM26 16a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h16a2 2 0 012 2v8z" fill="#929CA5"></path><rect x="26" y="26" width="20" height="6" rx="2" transform="rotate(-180 26 26)" fill="#929CA5"></rect><rect x="1" y="1" width="30" height="30" rx="3" stroke="#929CA5" strokeWidth="2"></rect></svg>
            <span>
              Загружайте картинки меньше 8МБ для тела публикации и меньше 1МБ для обложки публикации
            </span>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar