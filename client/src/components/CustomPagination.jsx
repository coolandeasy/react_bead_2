import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {FormSelect} from "react-bootstrap";
import {Pagination} from "@mui/material";

export function CustomPagination() {

	const {total, limit, skip} = useSelector(state => state.survey);
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();
	const handlePageChange = (e, v) => {
		let currPage = page;
		setPage(v);
		if (currPage > v) dispatch({type: "survey/setSkip", skip: (skip - limit) > 0 ? skip - limit : 0});
		else dispatch({type: "survey/setSkip", skip: skip + limit});
	};

	return (
		<tr>
			<td>
				<FormSelect style={{width: "4.5em"}}
							onChange={(e) => dispatch({type: "survey/setLimit", limit: e.target.value})}>
					<option>5</option>
					<option>10</option>
				</FormSelect>
			</td>
			<td style={{float: "right"}}>
				<Pagination count={Math.ceil(total / limit)} page={page} shape={"rounded"} onChange={handlePageChange}/>
			</td>
		</tr>
	)
}