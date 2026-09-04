import { useEffect, useMemo, useState } from 'react'
import {
  ArrowUpRight,
  ChevronRight,
  CircleDot,
  Code2,
  ExternalLink,
  GitBranch,
  Layers3,
  Menu,
  Search,
  Sparkles,
  X,
} from 'lucide-react'
import { areaOptions, projects, statusLabels } from './data/projects'

const hiddenRepos = new Set([
  'claude-code-relay',
  'IVOCT-MAE-Pretraining',
  'StealthReader',
  'software_manager',
  'xuetangx-js',
  'DL-SDN-Detect',
  'P4-RF',
])

function App() {
  const [activeArea, setActiveArea] = useState('全部项目')
  const [activeStatus, setActiveStatus] = useState('全部')
  const [query, setQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const visibleProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return projects.filter((project) => {
      const inArea = activeArea === '全部项目' || project.areas.includes(activeArea)
      const inStatus = activeStatus === '全部' || project.status === activeStatus
      const searchable = [
        project.title,
        project.summary,
        project.eyebrow,
        ...project.stack,
        ...project.areas,
        ...project.repos.map((repo) => repo.name),
      ]
        .join(' ')
        .toLowerCase()
      return inArea && inStatus && (!normalizedQuery || searchable.includes(normalizedQuery))
    })
  }, [activeArea, activeStatus, query])

  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedProject])

  const openProject = (project) => setSelectedProject(project)
  const scrollToProjects = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="返回顶部">
          <span className="brand-mark">YL</span>
          <span>杨昆龙 / PROJECTS</span>
        </a>
        <button className="menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="打开导航菜单">
          <Menu size={18} />
        </button>
        <nav className={menuOpen ? 'topnav is-open' : 'topnav'}>
          <a href="#projects" onClick={() => setMenuOpen(false)}>项目档案</a>
          <a href="#approach" onClick={() => setMenuOpen(false)}>工作方式</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>联系</a>
          <a className="github-link" href="https://github.com/yang-kun-long" target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-copy">
            <p className="kicker"><span className="kicker-line" />独立开发者 / 软件工程硕士</p>
            <h1>把复杂想法，<br /><em>做成可用的东西。</em></h1>
            <p className="hero-intro">
              杨昆龙的项目档案。围绕 AI 应用、开发者工具、HarmonyOS 与校园服务，记录从问题定义到部署维护的完整过程。
            </p>
            <div className="hero-actions">
              <button className="button button-dark" type="button" onClick={scrollToProjects}>浏览项目 <ChevronRight size={17} /></button>
              <a className="text-link" href="mailto:yang.kun.long@qq.com">yang.kun.long@qq.com <ArrowUpRight size={15} /></a>
            </div>
          </div>
          <div className="hero-stamp" aria-label="项目统计">
            <div className="stamp-ring"><span>YK</span></div>
            <div className="stamp-note">SELECTED WORKS<br />2024 — 2026</div>
          </div>
          <div className="hero-bottomline">
            <span>北京 · 中国</span>
            <span className="scroll-cue"><span className="scroll-dot" /> 向下探索</span>
          </div>
        </section>

        <section className="signal-band section-pad" id="approach">
          <div className="signal-lead">
            <span className="section-index">01 / 03</span>
            <h2>从真实需求<br />出发。</h2>
          </div>
          <div className="signal-copy">
            <p>我更关心一个系统是否真的能被使用：认证是否稳定、失败是否可恢复、数据是否能追溯、交付之后是否有人接得住。</p>
            <div className="signal-points">
              <span><Sparkles size={16} /> AI 与数据</span>
              <span><Code2 size={16} /> 产品工程</span>
              <span><Layers3 size={16} /> 端到端交付</span>
            </div>
          </div>
        </section>

        <section className="projects-section section-pad" id="projects">
          <div className="section-heading">
            <div>
              <span className="section-index">02 / 03</span>
              <h2>项目档案</h2>
            </div>
            <span className="project-count">{visibleProjects.length.toString().padStart(2, '0')} / {projects.length.toString().padStart(2, '0')}</span>
          </div>
          <div className="toolbar">
            <div className="filter-row" role="tablist" aria-label="项目分类">
              {areaOptions.map((area) => (
                <button key={area} type="button" className={activeArea === area ? 'filter-chip active' : 'filter-chip'} onClick={() => setActiveArea(area)}>
                  {area}
                </button>
              ))}
            </div>
            <div className="toolbar-right">
              <div className="search-box">
                <Search size={16} />
                <input id="project-search" name="project-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索项目、技术栈" aria-label="搜索项目、技术栈" />
              </div>
              <select id="project-status" name="project-status" value={activeStatus} onChange={(event) => setActiveStatus(event.target.value)} aria-label="按状态筛选">
                <option value="全部">全部状态</option>
                <option value="live">在线运行</option>
                <option value="released">已发布</option>
                <option value="shipped">已交付</option>
                <option value="building">持续开发</option>
                <option value="archive">学习与参与</option>
              </select>
            </div>
          </div>
          <div className="project-grid">
            {visibleProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} onOpen={() => openProject(project)} />
            ))}
          </div>
          {!visibleProjects.length && <div className="empty-state"><Search size={24} /><p>没有匹配的项目</p><button type="button" onClick={() => { setActiveArea('全部项目'); setActiveStatus('全部'); setQuery('') }}>清除筛选</button></div>}
        </section>

        <section className="closing-section section-pad" id="contact">
          <div className="closing-index"><span className="section-index">03 / 03</span><CircleDot size={17} /></div>
          <div className="closing-copy">
            <p className="kicker">保持好奇，持续交付</p>
            <h2>下一个问题，<br /><em>一起拆开。</em></h2>
            <a className="button button-light" href="mailto:yang.kun.long@qq.com">联系我 <ArrowUpRight size={17} /></a>
          </div>
          <div className="closing-meta"><span>AI / SYSTEMS / PRODUCT</span><span>© 2026 YANG KUNLONG</span></div>
        </section>
      </main>

      {selectedProject && <ProjectDrawer project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  )
}

function ProjectCard({ project, index, onOpen }) {
  return (
    <article className={project.featured ? 'project-card featured' : 'project-card'} onClick={onOpen}>
      {project.cover ? <div className="project-cover"><img src={project.cover} alt={`${project.title} 项目界面`} /><span className="cover-label">LIVE VIEW</span></div> : <div className="project-cover project-cover-empty"><span>{String(index + 1).padStart(2, '0')}</span><Code2 size={27} /></div>}
      <div className="card-content">
        <div className="card-topline"><span>{project.eyebrow}</span><Status status={project.status} /></div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="card-footer"><div className="stack-preview">{project.stack.slice(0, 3).map((item) => <span key={item}>{item}</span>)}</div><span className="open-detail">详情 <ChevronRight size={16} /></span></div>
      </div>
    </article>
  )
}

function Status({ status }) {
  return <span className={`status status-${status}`}><span className="status-dot" />{statusLabels[status]}</span>
}

function ProjectDrawer({ project, onClose }) {
  return (
    <div className="drawer-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <aside className="project-drawer" aria-label={`${project.title} 项目详情`}>
        <button className="drawer-close" type="button" onClick={onClose} aria-label="关闭项目详情"><X size={20} /></button>
        <div className="drawer-scroll">
          <div className="drawer-header">
            <span className="section-index">PROJECT / {project.year}</span>
            <Status status={project.status} />
            <h2>{project.title}</h2>
            <p>{project.summary}</p>
          </div>
          {project.cover && <div className="drawer-cover"><img src={project.cover} alt={`${project.title} 项目界面`} /></div>}
          <div className="drawer-block"><h4>技术栈</h4><div className="drawer-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div>
          <div className="drawer-block"><h4>设计与实现</h4><div className="design-list">{project.design.map((item, index) => <div className="design-item" key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>)}</div></div>
          {project.metrics && <div className="drawer-block"><h4>项目切面</h4><div className="metric-list">{project.metrics.map((metric) => <span key={metric}>{metric}</span>)}</div></div>}
          {project.attribution && <p className="attribution">{project.attribution}</p>}
          <div className="drawer-actions">
            {project.live && <a className="button button-dark" href={project.live} target="_blank" rel="noreferrer">{project.liveLabel || '打开在线项目'} <ExternalLink size={16} /></a>}
            {project.repos.filter((repo) => repo.url && !hiddenRepos.has(repo.name)).map((repo) => <a className="repo-link" href={repo.url} target="_blank" rel="noreferrer" key={repo.name}><GitBranch size={17} /> {repo.name} <ArrowUpRight size={14} /></a>)}
            {project.repos.filter((repo) => repo.visibility === 'private').length > 0 && <span className="private-note">含私有仓库 · 设计说明公开</span>}
          </div>
        </div>
      </aside>
    </div>
  )
}

export default App
