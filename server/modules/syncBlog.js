const path = require('path');
const exec = require('child_process').exec;

async function syncBlog() {

  await new Promise(function(resolve, reject) {

    try {
      const blog_repo_path = path.join(__dirname, '/../../blog_repo');

      exec(`git add .`, { cwd: blog_repo_path }, (error, stdout) => {
        if (error) { return reject(error); }
        console.log(stdout);

        exec(`git commit -m "update"`, { cwd: blog_repo_path }, (error, stdout) => {
          if (error) { return reject(error); }
          console.log(stdout);

          exec(`git push --force`, { cwd: blog_repo_path }, (error, stdout) => {
            if (error) { return reject(error); }
            console.log('同步 github 成功');
            resolve();
          })
        })
      })
    } catch (error) {
      console.error('同步 github 失败', error);
      reject(error);
    }

  });
}

module.exports = syncBlog;
