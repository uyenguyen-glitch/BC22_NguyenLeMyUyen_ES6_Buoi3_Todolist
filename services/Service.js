export default function Service() {
  this.getTask = () => {
    return axios.get("https://6280b82a7532b4920f72c262.mockapi.io/works");
  };

  this.addTask = (task) => {
    return axios({
      url: "https://6280b82a7532b4920f72c262.mockapi.io/works",
      method: "POST",
      data: task,
    });
  };

  this.deleteTask = (id) => {
    return axios({
      url: `https://6280b82a7532b4920f72c262.mockapi.io/works/${id}`,
      method: "DELETE",
    });
  };

  this.updateStatusTask = (task) => {
    return axios({
      url: `https://6280b82a7532b4920f72c262.mockapi.io/works/${task.id}`,
      method: "PUT",
      data: task,
    });
  };
}
