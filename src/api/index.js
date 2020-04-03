/** 
 * api接口的统一出口
 */

// 用户模块接口
import user from '@/api/user';

// 权限模块接口
import auth from '@/api/auth'

//标签模块接口
import tag from '@/api/tag'

//文章模块接口
import article from '@/api/article'

//学期模块接口
import term from '@/api/term'

//课程模块接口
import lesson from '@/api/lesson'

//考试模块接口
import exam from '@/api/exam'

// 导出接口
export default {    
    user,
    auth,
    tag,
    article,
    term,
    lesson,
    exam
}
