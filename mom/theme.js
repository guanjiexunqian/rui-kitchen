(() => {
  const markReady = () => document.documentElement.classList.add("v5-ready");

  const finish = () => {
    const backupState = document.getElementById("backupState");
    const backupKey = "mom-last-backup-zhouqun";
    const today = () => {
      const d = new Date();
      const p = n => String(n).padStart(2, "0");
      return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
    };

    const paintBackup = () => {
      if (!backupState) return;
      const last = localStorage.getItem(backupKey);
      if (!last) {
        backupState.textContent = "还没有备份过 · 建议现在备份一次";
        backupState.style.color = "var(--clay)";
        return;
      }
      const days = Math.max(0, Math.floor(
        (new Date(today() + "T00:00:00") - new Date(last + "T00:00:00")) / 86400000
      ));
      backupState.textContent = days === 0
        ? "上次备份：今天 · 很安心"
        : `上次备份：${last.slice(5).replace("-", "月")}日 · ${days} 天前`;
      backupState.style.color = "var(--green)";
    };

    paintBackup();

    const exportButton = document.getElementById("btnExport");
    if (exportButton) {
      exportButton.addEventListener("click", () => {
        localStorage.setItem(backupKey, today());
        setTimeout(paintBackup, 0);
      });
    }

    const dataButton = document.getElementById("btnGotoData2");
    if (dataButton) {
      dataButton.addEventListener("click", () => setTimeout(paintBackup, 0));
    }

    const oldToast = window.toast;
    if (typeof oldToast === "function") {
      window.toast = function (message) {
        const map = {
          "账本文件存好啦，发微信收藏里最稳": "账本已导出，放进微信收藏更安心",
          "这笔划掉了": "这一笔已经删除",
          "预算记好啦": "预算已保存",
          "存储满了，请删几笔旧的": "手机存储空间不足，请删掉几笔旧账"
        };
        return oldToast(map[message] || message);
      };
    }

    markReady();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(finish, 0));
  } else {
    setTimeout(finish, 0);
  }
})();
