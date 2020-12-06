package eternal.fire.xdcov.entity;

public class Message {
    private int e;
    private String m;

    public Message() {

    }

    public int getE() {
        return e;
    }

    public void setE(int e) {
        this.e = e;
    }

    public String getM() {
        return m;
    }

    public void setM(String m) {
        this.m = m;
    }

    public Message(int e, String m) {
        this.e = e;
        this.m = m;
    }
}
