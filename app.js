/** Header + Menu **/
class Header extends React.Component {
    constructor() {
        super()
        this.state = {
            addClass: false
        };
        this.menuClick = this.menuClick.bind(this);
    }
    menuClick() {
        this.setState({ addClass: !this.state.addClass });
    }

    render() {
        let hamburgerClass = "hamburger-menu";
        let brandingClass = "site-branding";
        let navigationClass = "site-navigation flex flex-column justify-content-between";
        let headerClass = "site-header";

        return (
            <div>
                <header className={headerClass + ((this.state.addClass) ? " no-shadow" : "")}>
                    <div className={brandingClass + ((this.state.addClass) ? " hide" : "")}>
                        <h1 className="site-title"><a href="index.html" rel="home"><i className="fa fa-home"></i></a></h1>
                    </div>
                    <div className={hamburgerClass + ((this.state.addClass) ? " close" : "")}
                        onClick={this.menuClick}>
                        <div className="menu-icon">
                            <img src="images/menu-icon.png" alt="menu icon" />
                        </div>
                        <div className="menu-close-icon">
                            <img src="images/x.png" alt="menu close icon" />
                        </div>
                    </div>
                </header>

                <nav className={navigationClass + ((this.state.addClass) ? " show" : "")}>
                    <div className="site-branding d-none d-lg-block ">
                        <h1 className="site-title"><a href="index.html" rel="home"><i className="fa fa-home"></i></a></h1>
                    </div>
                    <ul className="main-menu flex flex-column justify-content-center">
                        <li className="current-menu-item"><a href="/">Portfolio</a></li>
                        <li><a href="mailto:lin20170824@gmail.com">Contact</a></li>
                    </ul>
                    <p>
                        Copyright &copy;{(new Date().getFullYear())}  All rights reserved
                         | This template is made with
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                        by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                    </p>
                </nav>
                <div className="nav-bar-sep d-lg-none"></div>

            </div>
        );
    }
}

/** List **/
class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hide: false, pageView: "list" };
        
        //若有父層傳值則於此bind
        //若需從子層傳值則於render內bind
        //this.listClick = this.listClick.bind(this);
        
    }
    listClick(dataId) {
        this.setState({ hide: !this.state.hide});
        this.props.setPageView("detail", dataId);
    }

    render() {
        const listdata = this.props.blogData;
        const blogLi = listdata.map((item) => (
            <div className={"col-12 col-xl-6 no-padding" + ((this.state.hide) ? " d-none" : "")} key={item.id}>
                <div className="blog-content flex">
                    <figure>
                        <a href="javascript:;" onClick={this.listClick.bind(this, item.id)}><img src={item.pic} alt={item.id} /></a>
                    </figure>
                    <div className="entry-content flex flex-column justify-content-between align-items-start">
                        <header>
                            <h3><a href="javascript:;" onClick={this.listClick.bind(this, item.id)}>{item.title}</a></h3>
                            <div className="posted-by">{item.type}</div>
                        </header>
                        {/* <footer className="flex flex-wrap align-items-center">
                      <div className="posted-on">{item.year}</div>
                      <ul className="flex flex-wrap align-items-center">
                          <li>Portfolio</li>
                          <li>Tree</li>
                      </ul>
                  </footer> */}
                    </div>
                </div>
            </div>
        ));

        return (
            <div className="outer-container blog-page">
                <div className="container-fluid">
                    <div className="row">
                        {blogLi}
                    </div>
                </div>
            </div>
        );
    }
}

/** Detail **/
class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.back = this.back.bind(this);
    }
    back () {
        this.props.setPageView("list");
    }
    next (nextId) {
        this.props.setPageView("detail", nextId);
    }
    prev (prevId) {
        this.props.setPageView("detail", prevId);
    }
    
    render() {
        const { blogData, dataId } = this.props;
        const tmp = blogData.filter(e => e.id === dataId);
        const MaxId = blogData.length -1;
        const nextId = (dataId <= MaxId) ? dataId+1 : dataId;
        const prevId = (dataId > 1) ? dataId-1 : 1;
        const detail = (tmp.length > 0) ? tmp[0] : null;

        return (
            <div className="outer-container">
                <div className="single-post">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <ul className="breadcrumbs flex align-items-center">
                                    <li><a href="javascript:;" onClick={this.back}>Home</a></li>
                                    <li>{detail.title}</li>
                                </ul>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 d-none">
                                <div className="featured-img">
                                    <figure>
                                        <img src={detail.pic} alt={detail.title} />
                                    </figure>
                                </div>
                            </div>

                            <div className="col-12 offset-lg-1 col-lg-10">
                                <div className="content-area">
                                    <header className="entry-header">
                                        <div className="post-meta d-none">
                                            <a href="javascript:;">Portfolio</a>
                                        </div>

                                        <h1>{detail.title}</h1>

                                        <span className="byline">{detail.year} 
                                        <span className="author d-none"><a href="javascript:;">Phil Martinez</a></span></span>
                                    </header>

                                    <div className="entry-content" dangerouslySetInnerHTML={{__html: detail.body}}></div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <nav className="post-nav">
                                    <ul className="flex justify-content-between align-items-center">
                                        <li><a href="javascript:;" onClick={this.next.bind(this, prevId)}><img src="images/angle-left.png" alt="Previous" /></a></li>
                                        <li><a href="javascript:;" onClick={this.back}><img src="images/portfolio-icon.png" alt="Back to Portfolio" /></a></li>
                                        <li><a href="javascript:;" onClick={this.next.bind(this, nextId)}><img src="images/angle-right.png" alt="Next" /></a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

/** Home **/
class Home extends React.Component {
    constructor() {
        super()
        this.state = { 
            data: [] , 
            pageView: "list",
            dataId: 0
        }
    }
    componentDidMount() {
        axios.get('./demo.json')
            .then((response) => response.data)
            .then(data => this.setState({ data }));          
    }

    setPageView(pageView, dataId) {
        this.setState({pageView: pageView, dataId: dataId});
    }

    render() {
        const { data, pageView, dataId } = this.state;
        let view = null;
        switch (pageView)
        {
            case "list":
                view = <List blogData={data} setPageView={this.setPageView.bind(this)} />
            break;
            case "detail": 
                view = <Detail blogData={data} setPageView={this.setPageView.bind(this)} dataId={dataId} />
            break;
        }

        return (
            <div>
                <Header />
                {view}
            </div>
        );
    }
}

window.Home = Home;
