import { Database } from '../database';
import * as PromiseRouter from 'express-promise-router';

var fs = require('fs');

var db = new Database();
var router = PromiseRouter();
router.route('/')
  .get((req, res) => {
    //db.all('SELECT * FROM EquivCourse')
	db.all("select EquivID, Status, LocalCourse.CourseID as LocalCourseId, LocalCourse.Dept||' '||LocalCourse.CourseNum||' - '||LocalCourse.Title as LocalCourseName, ForeignCourse.CourseID as ForeignCourseID, ForeignCourse.Dept||' '||ForeignCourse.CourseNum||' - '||ForeignCourse.Title as ForeignCourseName, School.Name as SchoolName from LocalCourse join EquivCourse on (LocalCourse.CourseID=EquivCourse.LocalCourseID) join ForeignCourse on (ForeignCourse.CourseID=EquivCourse.ForeignCourseID) join School on (School.SchoolID=ForeignCourse.SchoolID) order by LocalCourseName asc")
    //.then(result => res.json(result));
	.then(result => {
		return sendResults(res, result);
	});
  })
  .post((req, res) => {
    db.run(`INSERT INTO EquivCourse
      (SCUClassID, OtherClassID, Status)
      VALUES (?,?,?)`,
      [req.body.SCUClassID, req.body.OtherClassID, req.body.Status])
    .then(result => res.json({ row: result.stmt.lastID }));
  });
router.route('/:SCUClassID')
  .get((req, res) => {
    db.all(`SELECT * FROM EquivCourse WHERE SCUClassID=?`, req.params.SCUClassID)
    .then(result => res.json(result));
  })
  .put((req, res) => {
    db.run(`UPDATE EquivCourse
      SET OtherClassID=?, Status=?, EquivID=?
      WHERE SCUClassID=?`,
      [req.body.OtherClassID, req.body.Status, req.body.EquivID, req.params.SCUClassID])
    .then(result => res.json({ status: 'OK' }));
  })
  .delete((req, res) => {
    db.run(`DELETE FROM EquivCourse WHERE SCUClassID=?`, req.params.SCUClassID)
    .then(result => res.json({ status: 'OK' }));
  });
  
function sendResults(res, result){
	var tableID = "justAnotherTable";
	var columnNames = ["SCU Course", "Foreign Course", "School", "Status"];
	var columns = ["LocalCourseName", "ForeignCourseName", "SchoolName", "Status"];
	
	res.writeHead(200, {'Content-Type': 'text/html'});
	
	res.write("<p>table is sortable if you click on the header name</p>");
	res.write("<table id=\""+tableID+"\">");
	res.write("<tr>");
	var i = 0;
	columnNames.forEach((entry) => {
		res.write("<th onclick=\"sortTable('"+tableID+"',"+i+")\">"+entry+"</th>");
		++i;
	});
	res.write("</tr>");
	result.forEach((row) => {
		res.write("<tr>");
		columns.forEach((entry) => {
			res.write("<td>"+row[entry]+"</td>");
		});
		res.write("</tr>");
	});
	res.write("</table>");
	
	res.write("<script>");
	var filename = "tableSortScript.js";
	var data = fs.readFileSync(filename, "utf8");
	res.write(data);
	res.write("</script>");
	
	return res.end();
}

export var EquivCourseRouter = router;