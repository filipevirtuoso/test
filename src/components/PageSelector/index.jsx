import * as S from './styled'
// Icons
import { FaAngleLeft } from 'react-icons/fa';
import { FaAngleRight } from 'react-icons/fa';

const PageSelector = ({prevPage, nextPage, page, pages, setPage, pageCount}) => {

  return(
    <S.Container>
      <S.PrevButton onClick={() => {prevPage()}}>
        <FaAngleLeft />
      </S.PrevButton>
      {pageCount.map((item, index) => {
        return <S.PageButton key={index} onClick={() => setPage(index)} active={index === page? 'true' : false}>
          {index + 1}
        </S.PageButton>
      })}
      <S.PrevButton onClick={() => {nextPage()}}>
        <FaAngleRight />
      </S.PrevButton>
    </S.Container>
  )
}

export default PageSelector