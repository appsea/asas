"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var frameModule = require("ui/frame");
function gotoResultPage(state) {
    frameModule.topmost().navigate({
        moduleName: 'shared/result/result-page',
        clearHistory: true,
        context: state,
        transition: {
            name: "fade"
        }
    });
}
exports.gotoResultPage = gotoResultPage;
function gotoDetailsPage(state) {
    frameModule.topmost().navigate({
        moduleName: 'shared/details/detailed-result',
        context: state,
        transition: {
            name: "fade"
        }
    });
}
exports.gotoDetailsPage = gotoDetailsPage;
function gotoLastPage() {
    frameModule.topmost().goBack();
}
exports.gotoLastPage = gotoLastPage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5hdmlnYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBd0M7QUFHeEMsd0JBQStCLEtBQVk7SUFDdkMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUMzQixVQUFVLEVBQUUsMkJBQTJCO1FBQ3ZDLFlBQVksRUFBRSxJQUFJO1FBQ2xCLE9BQU8sRUFBRSxLQUFLO1FBQ2QsVUFBVSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU07U0FDZjtLQUNKLENBQUMsQ0FBQztBQUNQLENBQUM7QUFURCx3Q0FTQztBQUVELHlCQUFnQyxLQUFZO0lBQ3hDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDM0IsVUFBVSxFQUFFLGdDQUFnQztRQUM1QyxPQUFPLEVBQUUsS0FBSztRQUNkLFVBQVUsRUFBRTtZQUNSLElBQUksRUFBRSxNQUFNO1NBQ2Y7S0FDSixDQUFDLENBQUM7QUFDUCxDQUFDO0FBUkQsMENBUUM7QUFFRDtJQUNJLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNuQyxDQUFDO0FBRkQsb0NBRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcmFtZU1vZHVsZSBmcm9tICd1aS9mcmFtZSc7XG5pbXBvcnQge1N0YXRlfSBmcm9tIFwiLi9xdWVzdGlvbnMubW9kZWxcIjtcblxuZXhwb3J0IGZ1bmN0aW9uXHRnb3RvUmVzdWx0UGFnZShzdGF0ZTogU3RhdGUpIHtcbiAgICBmcmFtZU1vZHVsZS50b3Btb3N0KCkubmF2aWdhdGUoe1xuICAgICAgICBtb2R1bGVOYW1lOiAnc2hhcmVkL3Jlc3VsdC9yZXN1bHQtcGFnZScsXG4gICAgICAgIGNsZWFySGlzdG9yeTogdHJ1ZSxcbiAgICAgICAgY29udGV4dDogc3RhdGUsXG4gICAgICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgICAgIG5hbWU6IFwiZmFkZVwiXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uXHRnb3RvRGV0YWlsc1BhZ2Uoc3RhdGU6IFN0YXRlKSB7XG4gICAgZnJhbWVNb2R1bGUudG9wbW9zdCgpLm5hdmlnYXRlKHtcbiAgICAgICAgbW9kdWxlTmFtZTogJ3NoYXJlZC9kZXRhaWxzL2RldGFpbGVkLXJlc3VsdCcsXG4gICAgICAgIGNvbnRleHQ6IHN0YXRlLFxuICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICBuYW1lOiBcImZhZGVcIlxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvblx0Z290b0xhc3RQYWdlKCkge1xuICAgIGZyYW1lTW9kdWxlLnRvcG1vc3QoKS5nb0JhY2soKTtcbn0iXX0=