import * as S from './styled'
// Icons
import { FaAngleLeft } from 'react-icons/fa';
import { FaAngleRight } from 'react-icons/fa';

const PageSelector = ({prevPage, nextPage, page, pages, setPage, pageCount}) => {


  return(
    <S.Container>
      <S.PrevButton onClick={() => {prevPage()}}>
        <FaAngleLeft size={30} />
      </S.PrevButton>
      {/* {pageCount.map((item, index) => {
        return <S.PageButton key={index} onClick={() => setPage(index)} active={index === page? 'true' : false}>
          {index + 1}
        </S.PageButton>
      })} */}
      <S.Div>{`${page + 1} / ${pageCount.length} `}</S.Div>
      <S.NextButton onClick={() => {nextPage()}}>
        <FaAngleRight size={30} />
      </S.NextButton>
    </S.Container>
  )
}

export default PageSelector